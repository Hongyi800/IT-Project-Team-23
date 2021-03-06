/* eslint-disable no-restricted-globals */
import React, { Component } from "react";
import Navbar from "../../components/Navbar";
import { Button, Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { viewProfile, updateProfile, shareProfile } from "../profileApi";
import Loading from "../Loading";

let baseURL = "https://fate-e-portfolio.herokuapp.com/api/profile/updateAvatar";
//let baseURL = "http://localhost:8080/api/profile/updateAvatar";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt1M = file.size / 1024 / 1024 < 1;
  if (!isLt1M) {
    message.error("Image must smaller than 1MB!");
  }
  return isJpgOrPng && isLt1M;
}

//export var curShareLink = this.state.shareLink;
export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: null,
      username: "",
      firstname: "",
      lastname: "",
      description: "",
      isLoaded: false,
      error: null,
      loading: false,
      imageUrl: null,
      ifEdit: false,
      status: false,
      loadings: [],
      shareLink: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.changeEdit = this.changeEdit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.submitProfile = this.submitProfile.bind(this);
    this.getShareLink = this.getShareLink.bind(this);
  }

  componentDidMount() {
    this.fetchInfo(localStorage.getItem("email"));
  }

  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          imageUrl: imageUrl,
          loading: false,
        })
      );
      console.log("done!");
    }
  };

  handleUpdate(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    // if (value.length > 200) {
    //   this.setState({
    //     [name]: value.substring(0, 200),
    //   });
    // } else {
      this.setState({
        [name]: value,
      });
    // }
  }

  submitProfile(detail) {
    const { firstname, lastname, username, description } = detail;
    this.enterLoading(0);
    if (
      firstname.length === 0 ||
      lastname.length === 0 ||
      username.length === 0
    ) {
      alert("name cannot be empty");
    } else {
      updateProfile({
        email: localStorage.getItem("email"),
        firstname: firstname,
        lastname: lastname,
        username: username,
        description: description,
      }).then((status) =>
        this.setState({
          status: status.res.result,
        })
      );
    }
  }

  fetchInfo(email) {
    viewProfile({ email: email }).then((userInfo) =>
      this.setState({
        userInfo: userInfo,
        isLoaded: true,
        username: userInfo.res.username,
        loading: false,
        firstname: userInfo.res.firstname,
        lastname: userInfo.res.lastname,
        description: userInfo.res.description,
        imageUrl: this.setImage(userInfo.res.avatar),
        shareLink: userInfo.res.link,
      })
    );
  }

  setImage(avatar) {
    if (avatar !== null) {
      var prevUrl = avatar.image.data;
      return "data:" + avatar.imageType + ";base64," + prevUrl;
    }
    return null;
  }

  changeEdit = () => {
    this.setState({
      ifEdit: true,
    });
  };

  //the loading button is referenced from https://ant.design/components/button-cn/
  enterLoading = (index) => {
    this.setState(({ loadings }) => {
      const newLoadings = [...loadings];
      newLoadings[index] = true;

      return {
        loadings: newLoadings,
      };
    });
    setTimeout(() => {
      this.setState(({ loadings }) => {
        const newLoadings = [...loadings];
        newLoadings[index] = false;

        return {
          loadings: newLoadings,
        };
      });
    }, 12000);
  };

  getShareLink() {
    if (
      window.confirm(
        "Are you sure to replace your previous link with a new link?"
      )
    ) {
      shareProfile({
        email: localStorage.getItem("email"),
      }).then(
        (shareLink) => shareLink.res
        //console.log(shareLink.res)
      );
      window.location.replace("/admin/dashboard");
    } else {
    }
  }

  render() {
    const {
      isLoaded,
      firstname,
      lastname,
      username,
      description,
      error,
      loading,
      imageUrl,
      ifEdit,
      loadings,
    } = this.state;
    if (this.state.status === true) {
      window.location.replace("/admin/dashboard");
      // console.log("refresh");
    }
    if (error) {
      //couldn't fetch data from server
      return (
        <div className="pageContainer">
          <Navbar />
          <p className="message">
            Something went wrong. Error: {error.message}
          </p>
          ;
        </div>
      );
    } else if (!isLoaded) {
      //loading screen
      return (
        <div className="pageContainer">
          <Navbar />
          <Loading />
        </div>
      );
    } else {
      const uploadButton = (
        <div className="uploadButton">
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div className="uploadInfo">Upload</div>
        </div>
      );

      if (ifEdit) {
        return (
          <div className="pageContainer">
            <Navbar />
            <div className="grid-container">
              <div className="leftCol">
                <div className="avatarBox">
                  <Upload
                    name="image"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action={baseURL + `/${localStorage.getItem("email")}`}
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="avatar"
                        style={{ width: "10rem", height: "10rem" }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </div>
                <div className="editButtonBox">
                  <div className="avatarMessage">Click the image to update your avatar</div>
                  <br />
                  <br />
                  <Button block disabled>
                    Edit Profile
                  </Button>
                  <br />
                  <br />
                  <Button block disabled>
                    Generate a new share link
                  </Button>
                  <br />
                  <br />
                  <Button
                    block
                    value="default"
                    loading={loadings[0]}
                    onClick={() =>
                      this.submitProfile({
                        firstname,
                        lastname,
                        username,
                        description,
                      })
                    }
                  >
                    Update
                  </Button>
                </div>
              </div>
              <div className="rightCol">
                <div className="profileHeadings">Profile</div>

                <div className="profileInfo">
                  Email:
                  <div className="currentInfo">
                    {localStorage.getItem("email")}
                  </div>
                </div>

                <div className="profileInfo">
                  Username:
                  <div className="currentInfo">
                    <input
                      type="text"
                      name="username"
                      value={this.state.username}
                      onChange={this.handleUpdate}
                      required
                    />
                  </div>
                </div>
                <div className="nameInfo">
                  <div className="profileInfo">
                    First name:
                    <div className="currentInfo">
                      <input
                        type="text"
                        name="firstname"
                        value={this.state.firstname}
                        onChange={this.handleUpdate}
                        required
                      />
                    </div>
                  </div>

                  <div className="profileInfo">
                    Last name:
                    <div className="currentInfo">
                      <input
                        type="text"
                        name="lastname"
                        value={this.state.lastname}
                        onChange={this.handleUpdate}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="profileInfo">
                  Self Introduction:
                  <div className="currentInfo">
                    <textarea
                      type="text"
                      name="description"
                      rows="2"
                      cols="50"
                      maxLength="200"
                      value={this.state.description}
                      onChange={this.handleUpdate}
                      required
                    />
                  </div>
                </div>
                <div className="profileInfo">
                  Sharable Link:
                  <div className="currentInfo">
                    <a
                      href={
                        "http://localhost:3000/guest/dashboard/" +
                        this.state.shareLink
                      }
                    >
                      {"http://localhost:3000/guest/dashboard/" +
                        this.state.shareLink}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="pageContainer">
            <Navbar />
            <div className="grid-container">
              <div className="leftCol">
                <div className="avatarBox">
                  <Upload
                    name="image"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action={baseURL + `/${localStorage.getItem("email")}`}
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange}
                  >
                    <div className="curAvatar">
                      {imageUrl ? (                      
                        <img
                          src={imageUrl}
                          alt="avatar"
                          style={{ width: "10rem", height: "10rem" }}                      
                        />                     
                      ) : (
                        uploadButton
                      )}
                    </div>
                  </Upload>
                </div>
                <div className="editButtonBox">
                  <div className="avatarMessage">Click the image to update your avatar</div>
                  <br />
                  <br />
                  <Button block onClick={this.changeEdit}>
                    Edit Profile
                  </Button>
                  <br />
                  <br />
                  <Button block onClick={this.getShareLink}>
                    Generate a new share link
                  </Button>
                </div>
              </div>
              <div className="rightCol">
                <div className="profileHeadings">Profile</div>

                <div className="profileInfo">
                  Email:
                  <div className="currentInfo">
                    {localStorage.getItem("email")}
                  </div>
                </div>

                <div className="profileInfo">
                  Username:
                  <div className="currentInfo">{this.state.username}</div>
                </div>
                <div className="nameInfo">
                  <div className="profileInfo">
                    First name:
                    <div className="currentInfo">{this.state.firstname}</div>
                  </div>

                  <div className="profileInfo">
                    Last name:
                    <div className="currentInfo">{this.state.lastname}</div>
                  </div>
                </div>
                <div className="profileInfo">
                  Self Introduction:
                  <div className="intro">{this.state.description}</div>
                </div>
                <div className="profileInfo">
                  Sharable Link:
                  <div className="currentInfo">
                    <a
                      href={
                        "http://localhost:3000/guest/dashboard/" +
                        this.state.shareLink
                      }
                    >
                      {"http://localhost:3000/guest/dashboard/" +
                        this.state.shareLink}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
  }
}

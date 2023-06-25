import axios from "axios";
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const apiUrl = process.env.REACT_APP_BASE_URL;
const headers = {
  "Content-Type": "application/json",
  Authorization: localStorage.getItem("token"),
};

export default class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      isShowMore: false,
      edit: false,
      content: "",
      contentTags: [],
      updatedTagList: [],
      tagValue: "",
    };
  }

  componentDidMount() {
    const { generatedContent, tags } = this.props;
    this.setState({
      content: generatedContent,
      contentTags: tags,
    });
  }

  updatePostContent = () => {
    console.log(this.props.post);
  };

  //   handleHashtagRemove = (tag) => {
  //     const { contentTags } = this.state;
  //     const updateTags = contentTags?.filter((val) => val !== tag);
  //     this.setState({ contentTags: updateTags });
  //   };

  handleSavePost = async () => {
    const { imgSrc, post, getPostList } = this.props;
    const { content, contentTags } = this.state;
    const config = { headers };
    try {
      const response = await axios.put(
        `${apiUrl}rest/accounts/posts`,
        {
          postId: post?.id,
          tags: contentTags.join(" "),
          postContent: content,
          height: 424,
          width: 424,
          userId: parseInt(localStorage.getItem("userId")),
          schedulerTime: "",
          imageURL: imgSrc,
          facebook: false,
          instagram: false,
          linkedIn: true,
        },
        config
      );
      if (response?.data?.type === "Success") {
        this.handlePostEdit(false);
        getPostList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  handlePostEdit = (isOpen) => {
    this.setState({ edit: isOpen });
  };

  handleHashtagRemove = (tag) => {
    const { updatedTagList } = this.state;
    this.setState({ updatedTagList: [...updatedTagList, tag] });
  };

  removeTagValue = (e) => {
    const { contentTags } = this.state;
    this.setState({
      tagValue: "",
      contentTags: [...contentTags, e?.target?.value],
    });
  };

  render() {
    const { imgSrc, tags, generatedContent } = this.props;
    console.log(this.props);
    const { isShowMore, edit, content, contentTags, updatedTagList, tagValue } =
      this.state;
    return (
      <>
        <div className="post-container">
          <div className="card">
            <div className="header-btn">
              <button
                className="card-btn"
                onClick={() => this.handlePostEdit(true)}
              >
                Edit
              </button>
              <button
                onClick={this.handleSavePost}
                className="card-btn save-post-btn"
              >
                Save post
              </button>
            </div>
            <div
              className="post-image"
              onClick={() => this.handlePostEdit(true)}
            >
              <img src={imgSrc} alt="post_image" />
            </div>
            <div className={`post-content ${isShowMore ? "more" : ""}`}>
              <div className="content">{generatedContent}</div>
              {isShowMore ? (
                <div className="tags">
                  {tags.map((tag) => (
                    <span className="post-hashtag">{`#${tag}`}</span>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="more-btn">
              <button
                onClick={() => this.setState({ isShowMore: !isShowMore })}
              >
                {isShowMore ? "Show less" : "Show more"}
              </button>
            </div>
          </div>
        </div>
        <Modal
          className="popup-modal"
          show={edit}
          onHide={() => this.setState({ edit: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Post Content</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                onChange={(e) => this.setState({ content: e?.target?.value })}
                rows={5}
              />
            </Form.Group>
            <label className="editTag-label">Hash Tag</label>
            <div className="editTag">
              {contentTags?.map((tag) => (
                <span
                  className={updatedTagList.includes(tag) ? "added" : ""}
                  onClick={() => this.handleHashtagRemove(tag)}
                >
                  {tag}
                </span>
              ))}
              <input
                name="tag-add"
                id="tag-add"
                className="tag-add"
                onChange={(e) =>
                  this.setState({
                    tagValue: e?.target?.value,
                    updatedTagList: [...updatedTagList, e?.target?.value],
                  })
                }
                value={tagValue}
                //   onKeyDown={(e) => console.log(e)}
                onKeyDown={(e) => e.key === "Enter" && this.removeTagValue(e)}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.setState({ edit: false })}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                this.setState({ contentTags: updatedTagList }, () => {
                  this.handleSavePost();
                });
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

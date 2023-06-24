import axios from "axios";
import React, { useRef, useState } from "react";
import NewPost from "./NewPost";
import Form from "react-bootstrap/Form";
// import EditGeneratedPost from "./EditGeneratedPost";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Loader from "../Loader/Loader"

const CreatePost = () => {
  const [inputTopic, setInputTopic] = useState("");
  const [selectPostType, setSelectPostType] = useState("image");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [hashTag, setHashTag] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [step, setStep] = useState(1);
  const inputRef= useRef();
  const api_key = "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";
  const handleChats = async () => {
    const resp = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: inputTopic }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${api_key}`,
        },
      }
    );
    setGeneratedContent(resp?.data?.choices[0]?.message?.content);
  };

  const generateImage = async () => {
    try {
      const resp = await axios.post(
        "https://api.openai.com/v1/images/generations",
        {
          prompt: inputTopic,
          n: 1,
          size: "512x512",
        },
        {
          headers: {
            Authorization: `Bearer ${api_key}`,
          },
        }
      );
      const data = await resp.data.data[0].url;
      setImage(data);
      setTags([]);
      setHashTag([]);
      setIsLoading(false);
      setStep(2);
      return data;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleSteps = (step) => {
    setStep(step);
  };

  const getTags = async () => {
    const img_url = await generateImage();
    const apiKey = "acc_78b40252a8b826e";
    const apiSecret = "e1c1d9751f77a4dce26a5f823a040c13";
    const auth = {
      username: apiKey,
      password: apiSecret,
    };
    const url = `https://api.imagga.com/v2/tags?image_url=${encodeURIComponent(
      img_url
    )}`;
    try {
      const response = await axios.get(url, { auth });
      const respTags = response?.data?.result?.tags?.map((item) => item.tag.en);
      setTags(respTags);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostEdit = () => {
    setIsEdit(true);
  };

  const handleInputChange = (e) => {
    setInputTopic(e?.target?.value);
  };

  const handleRadioInput = (check_field) => {
    setSelectPostType(check_field);
  };

  const generatePost = () => {
    setIsLoading(true);
    handleChats();
    getTags();
  };

  const handleHashtagRemove = (tag) => {
    const updateTags = tags?.filter((val) => val !== tag);
    setTags(updateTags);
  };

  return (
    <div className="create-post-container">
      {step === 1 ? (
        !isLoading ? (
                <>
          <h2 className="title">What do you want to create today?</h2>
          <div className="form-field">
            <label htmlFor="topic" className="label field_label">
              Any Topic Brewing in your mind?
            </label>
            <textarea
              name="topic"
              onChange={handleInputChange}
              value={inputTopic}
              id="topic"
              className="input_field"
              minLength={15}
              ref={inputRef}
            />
            <div className={`required`}>Minimum 15 characters are required</div>
          </div>
          <div className="wrapper_field">
            <label className="label field_label">
              What do you want to generate?
            </label>
            <div class="wrapper">
              <input
                type="radio"
                onClick={() => handleRadioInput("image")}
                name="select"
                id="option-1"
                checked={selectPostType === "image"}
              />
              <input
                type="radio"
                onClick={() => handleRadioInput("video")}
                name="select"
                id="option-2"
                checked={selectPostType === "video"}
              />
              <label for="option-1" class="option option-1">
                <div class="dot"></div>
                <span>Images</span>
              </label>
              <label for="option-2" class="option option-2">
                <div class="dot"></div>
                <span>video</span>
              </label>
            </div>
          </div>
          <button className={"primary-btn"} onClick={inputTopic.length >= 15 ? generatePost : ()=>{inputRef?.current?.focus()}}>
            {"Generate Post"}
          </button>
        </>
        ):<div className="my-4"><Loader/></div>
      ) : null}
      {step === 2 ? (
        <NewPost
          imgSrc={image}
          tags={tags}
          handlePostEdit={handlePostEdit}
          generatedContent={generatedContent}
          handleSteps={handleSteps}
        />
      ) : null}
      <Modal
        className="popup-modal"
        show={isEdit}
        onHide={() => setIsEdit(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Post Content</Form.Label>
            <Form.Control
              as="textarea"
              value={generatedContent}
              onChange={(e) => setGeneratedContent(e?.target.value)}
              rows={5}
            />
          </Form.Group>
          <label className="editTag-label">Hash Tag</label>
          <div className="editTag">
            {tags?.map((tag) => (
              <span>
                {tag}
                <span
                  className="cros-btn"
                  onClick={() => handleHashtagRemove(tag)}
                >
                  x
                </span>
              </span>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsEdit(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setIsEdit(false)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreatePost;

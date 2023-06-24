import axios from "axios";
import React, { useState } from "react";
import NewPost from "./NewPost";

const CreatePost = () => {
  const [inputTopic, setInputTopic] = useState("");
  const [selectPostType, setSelectPostType] = useState("image");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [hashTag, setHashTag] = useState({});
  const [generatedContent, setGeneratedContent] = useState("");
  const [step, setStep] = useState(1);

  const api_key = "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";
  console.log(generatedContent, hashTag, tags, image);
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

  return (
    <div class="create-post-container">
      {step === 1 ? (
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
            />
          </div>
          <div className="">
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
          <button className="primary-btn" onClick={generatePost}>
            {isLoading ? "Loading..." : "Generate Post"}
          </button>
        </>
      ) : null}
      {step === 2 ? (
        <NewPost
          imgSrc={image}
          tags={tags}
          generatedContent={generatedContent}
        />
      ) : null}
    </div>
  );
};

export default CreatePost;

import axios from 'axios';
import { useEffect, useState } from 'react';

const PopupModal = () => {
  const [open, setOpen] = useState(false);

  const [input, setInput] = useState('');
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [hashTag, setHashTag] = useState({});
  const [generatedContent, setGeneratedContent] = useState('');
  const [tab, setTab] = useState('create');

  const api_key = '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';

  const handleChats = async () => {
    const resp = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: input }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${api_key}`,
        },
      }
    );
    setGeneratedContent(resp?.data?.choices[0]?.message?.content);
  };

  const generateImage = async () => {
    try {
      const resp = await axios.post(
        'https://api.openai.com/v1/images/generations',
        {
          prompt: input,
          n: 1,
          size: '512x512',
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
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  const getTags = async () => {
    const img_url = await generateImage();
    const apiKey = 'acc_78b40252a8b826e';
    const apiSecret = 'e1c1d9751f77a4dce26a5f823a040c13';
    const auth = {
      username: apiKey,
      password: apiSecret,
    };
    const url = `https://api.imagga.com/v2/tags?image_url=${encodeURIComponent(img_url)}`;
    try {
      const response = await axios.get(url, { auth });
      const respTags = response?.data?.result?.tags?.map((item) => item.tag.en);
      setTags(respTags);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleChats();
    getTags();
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setHashTag({ ...hashTag, [`#${value}`]: checked });
  };

  return (
    <div>
      <button className="box" onClick={() => setOpen(true)}>
        Open Modal
      </button>
      <div className={`overlay ${open ? 'overlay-open' : ''}`}>
        <div className="popup">
          <div className="header">
            <div className="wrapper">
              <button onClick={() => setTab('create')}>Create</button>
              <button onClick={() => setTab('images')}>Images</button>
              <button onClick={() => setTab('content')}>Content</button>
              <button onClick={() => setTab('hashtag')}>HashTag</button>
            </div>
          </div>

          <button className="close" onClick={() => setOpen(false)}>
            &times;
          </button>
          <div className="content">
            {tab === 'create' && (
              <form>
                <div className="mb-3">
                  <div>
                    <label htmlFor="image" className="form-label">
                      Search for image
                    </label>
                  </div>
                  <input type="text" name="prompt" id="image" value={input} onChange={handleInputChange} />
                </div>

                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                  GET
                </button>
              </form>
            )}
            {tab === 'images' && image && <img src={image} alt={input} width={400} height={300} />}
            {tab === 'content' && <article>{generatedContent}</article>}
            {tab === 'hashtag' && (
              <div>
                <div style={{ marginTop: '15px' }}>
                  {tags.map((tag) => (
                    <>
                      <input type="checkbox" name={tag} id={tag} value={tag} onChange={handleCheckboxChange} />
                      <label htmlFor={tag}>{tag}</label>
                    </>
                  ))}
                </div>
                <div style={{ marginTop: '15px' }}>
                  {Object.entries(hashTag).map((tag) => (
                    <>{tag[1] && tag[0]}</>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;

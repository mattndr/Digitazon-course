import { useEffect, useState } from 'react';

export default function GptWithYoutube() {
  const [textToSearch, setTextToSearch] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [buttonStatus, setButtonStatus] = useState(false);

  useEffect(() => {
    if (!textToSearch.length > 0) return;
    console.log(textToSearch);
    const API_URL = 'https://api.openai.com/v1/chat/completions';
    (async function getTextFromGpt() {
      const result = await fetch(API_URL, {
        method: 'POST',
        // mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer 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',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: `I need a ready to embed youtube video url, only the url and do not print anything else, related to ${textToSearch}`,
            },
          ],
          temperature: 0.7,
        }),
      });
      let url = (await result.json()).choices[0].message.content;
      url = YouTubeGetID(url);
      setTextToSearch('');
      if (!url) return;
      setYoutubeUrl(`https://www.youtube.com/embed/${url}`);
    })();
  }, [buttonStatus]);

  function YouTubeGetID(url) {
    url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return url[2] !== undefined ? url[2].split(/[^0-9a-z_\-]/i)[0] : '';
  }

  return (
    <div>
      <input
        value={textToSearch}
        onChange={(e) => setTextToSearch(e.target.value)}
      ></input>
      <button onClick={() => setButtonStatus((prev) => !prev)}>Search</button>
      <div>{youtubeUrl}</div>
      <iframe
        title="YoutubeVideo"
        width="420"
        height="315"
        src={youtubeUrl}
      ></iframe>
    </div>
  );
}

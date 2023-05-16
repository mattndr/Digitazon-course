// scrivere un applicazione frontend che interroghi le api di gpt3, basta che ci sia la possibilita' di scrivere una domanda e ottenere una risposta

import { useEffect, useState } from 'react';

export default function GptApi() {
  const [message, setMessage] = useState('ok');
  const [response, setResponse] = useState('');
  useEffect(() => {
    const API_URL = 'https://api.openai.com/v1/chat/completions';

    async function getChatGPTResponse() {
      const response = await fetch(API_URL, {
        method: 'POST',
        mode: 'no-cors',

        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer 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', // sostituisci YOUR_API_KEY con la tua chiave API
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: 'Say this is a test!' }],
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      const chatGPTResponse = data.choices[0].text.trim();
      setResponse(chatGPTResponse);
      console.log(chatGPTResponse);
    }
    getChatGPTResponse();
  });
  return (
    <>
      <label for="inputMsg" />
      <input
        id="inputMsg"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      {/* <div>
        {response.map((el) => (
          <span>{el.choices.text}</span>
        ))}
      </div> */}
    </>
  );
}

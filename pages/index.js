import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const topic = "https://intro-mercure.test/users/chat";

  const handleSubmit = () => {
    if (value.length >= 1) {
      axios.post("http://localhost:3000/api/mercure", { message: value, topic: topic }).then(resp => {
        setValue("");
      });
    }
  };

  useEffect(() => {
    const url = new URL("https://localhost/.well-known/mercure");
    url.searchParams.append("topic", "https://intro-mercure.test/users/chat");
    const eventSource = new EventSource(url);
    eventSource.onmessage = e => {
      /* console.log(e); */
      console.log(e);
      if (e?.data) {
        const message = JSON.parse(e?.data);
        const me = message.message;

        console.log(me);
        messages.push(me);
        setMessages(messages);
      }
      return () => {
        eventSource.close();
      };
    }; // do something with the payload
  }, []);

  return (
    <div>
      <ul>
        {messages?.map((message, key) => {
          return <li key={key}>{message}</li>;
        })}
      </ul>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input type="text" value={value} onChange={e => setValue(e.target.value)} />
        <button>Envoyer</button>
      </form>
    </div>
  );
}

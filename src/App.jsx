import React from "react";
// import emojies from "./emojies.map";
import SelectorContainer from "./containers/SelectorContainer";
import { useState } from "react";

function App() {
  const [emoji, setEmoji] = useState("❓");
  return (
    <>
      <div className="demo-app-banner" />
      <div className="demo-app-container">
        <div className="demo-app-content">
          <h2>Reaction is a Simple, Lightweight React Emoji Selector</h2>
          <p>
            It provides core components and utilities to let users react (using
            emojies) to content easily. Reaction is also highly customizable, so
            you can add it everywhere and it will fit right in!
          </p>
          <h3>Components</h3>
          <p>
            Here's the different components you will find in Reaction and how to
            use them.
          </p>
          <div style={{ marginTop: "2em" }}>
            <SelectorContainer
              style={{ margin: "auto" }}
              onEmojiClicked={(emoji) => setEmoji(emoji.char)}
            />
          </div>
          <div style={{ textAlign: "center", marginTop: "16px" }}>
            Last clicked emoji
            <div style={{fontSize: "48px", marginTop: "16px"}}>{emoji}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

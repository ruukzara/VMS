import React, { useState } from "react";

function FontSelector({ onChange }) {
  const [font, setFont] = useState("Roboto");

  const handleEnglishFontChange = (e) => {
    const font = e?.target?.value;
    setFont(font);
    onChange(font);
  };

  return (
    <div>
      <label htmlFor="english-font-select">Change Font:</label>
      <select
        id="english-font-select"
        value={font}
        onChange={handleEnglishFontChange}>
        <option value="Roboto">Roboto</option>
        <option value="'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif">
          Noto Sans JP
        </option>
      </select>
    </div>
  );
}

export default FontSelector;

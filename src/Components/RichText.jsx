import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
function RichText() {
  const editor = useRef(null);
	const [content, setContent] = useState('');
  localStorage.setItem('DATA',content)


  return (
    <div>
      <JoditEditor
			ref={editor}
			value={content}
			tabIndex={1} // tabIndex of textarea
			onChange={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
			
		/>
      
    </div>
  );
}

export default RichText;

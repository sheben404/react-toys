import React, { useState } from "react";
import { Input } from "antd";

interface Props {
  onSetQuery: (value: string) => void
  placeholder: string
}

const TodoInput: React.FC<Props> = ({ onSetQuery, placeholder }) => {
  const [value, setValue] = useState("");
  const onAdd = () => onSetQuery(value);

  return (
    <section className="input-wrap">
      <Input
        onPressEnter={onAdd}
        value={value}
        onChange={e => setValue(e.target.value)}
        className="input"
        placeholder={placeholder}
      />
      <Input type={'submit'} value='search' onClick={onAdd} style={{marginLeft:"3vw", width:'5vw'}}/>
    </section>
  );
};

export default TodoInput;

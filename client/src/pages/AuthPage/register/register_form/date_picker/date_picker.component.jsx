import React, { useState } from 'react';
import DatePicker from 'react-date-picker';

export default function DatePick() {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <DatePicker
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
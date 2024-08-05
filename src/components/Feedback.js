import { useState } from "react";
import { Button } from "@mui/material";

const Feedback = ({ onSubmit }) => {
  const [rating, setRating] = useState(null);

  return (
    <div>
      <Button onClick={() => setRating(1)}>1</Button>
      <Button onClick={() => setRating(2)}>2</Button>
      <Button onClick={() => setRating(3)}>3</Button>
      <Button onClick={() => setRating(4)}>4</Button>
      <Button onClick={() => setRating(5)}>5</Button>
      <Button onClick={() => onSubmit(rating)}>Submit</Button>
    </div>
  );
};

export default Feedback;
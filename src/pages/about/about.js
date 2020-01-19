import * as React from 'react';
import { useEffect } from "react";
import { actions, /* useSelector */ } from "../../utils/mirror";


const About = (...props) => {
  // const about = useSelector(({ about }) => about);
  console.log(props);
  useEffect(() => {
    document.title = "关于 | Learn React Hooks";
  }, []);

  return (
    <div className="wrap">
      <button onClick={actions.about.test}>test</button>
      <button onClick={actions.routing.goBack}>goBack</button>
    </div>
  );
};

export default About;

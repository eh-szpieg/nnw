import React from 'react';

function multiForm(props) {
  function handleSubmit(event) {
    event.preventDefault();
    props.onSubmit();
  }

  return (
    <form onSubmit={handleSubmit}>
        {props.children}
    </form>
  );
}

export default multiForm;
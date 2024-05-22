import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from 'reactstrap';

function Accordian({ options = [] }) {
  const [open, setOpen] = useState('1'); // Initial open state should be a string or a valid ID

  const toggle = (id) => {
    if (open === id) {
      setOpen(''); // Clear the open state if the same id is clicked
    } else {
      setOpen(id); // Set the open state to the new id
    }
  };

  return (
    <div>
      <Accordion open={open} toggle={toggle}>
        {options.map((option, index) => {
          const id = `${index}-${option.title}`;
          return (
            <AccordionItem key={id}>
              <AccordionHeader targetId={id} onClick={() => toggle(id)}>
                {option.title}
              </AccordionHeader>
              <AccordionBody accordionId={id}>
                {option.desc}
              </AccordionBody>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}

Accordian.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Accordian;

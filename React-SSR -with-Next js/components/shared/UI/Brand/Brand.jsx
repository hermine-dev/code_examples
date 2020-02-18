import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import classes from './brand.scss';

const Brand = (props) => {
  let isFor = '';
  switch (props.isFor) {
    case 'sidebar':
      isFor = classes['app-brand--sidebar'];
      break;
    case '':
      isFor = '';
      break;
  }

  return (
    <Link href="/" prefetch={false}>
      <div className={`${classes['app-brand']} ${isFor} brand`}>
        <>
          i
          <span>Planner</span>
        </>
      </div>
    </Link>
  );
};

Brand.propTypes = {
  isFor: PropTypes.string
};


export default Brand;

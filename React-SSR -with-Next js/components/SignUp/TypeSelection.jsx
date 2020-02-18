import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Title, Button } from 'components/shared/UI';
import classes from './signUp.scss';

const TypeSelection = (props) => {
  const [role, setRole] = useState('');
  return (
    <div className="mx-sm-0 mx-4 mt-md-0 mt-5">
      <Title
        renderTag="h2"
        align="center"
        color="dark"
        size="md"
        subtitle="let's get started"
        uppercase
        underline
      >
        What kind of user do you want to be ?
      </Title>
      <form className={classes['role-selection']}>
        <div className={classes['role-selection__card']}>
          <input
            type="radio"
            name="role"
            id="user"
            onChange={() => setRole('user')}
          />
          <label htmlFor="user">
            <span className={classes['checked']} />
            <img src="/static/img/icons/iPlanner_icons_4.svg" alt="icon" />
            <div className={classes['role-selection__card__content']}>
              <span>I want to hire to get job done</span>
            </div>
          </label>
        </div>
        <div className={classes['role-selection__card']}>
          <input
            type="radio"
            name="role"
            id="contractor"
            onChange={() => setRole('contractor')}
          />
          <label htmlFor="contractor">
            <span className={classes['checked']} />
            <img src="/static/img/icons/iPlanner_icons_5.svg" alt="icon" />
            <div className={classes['role-selection__card__content']}>
              <span>I want to get job</span>
            </div>
          </label>
        </div>
        <div className="text-center mt-4">
          <Button
            variant="primary"
            size="md"
            disabled={!role}
            onClick={() => props.onTypeChange(role)}
          >
            Next
            <i className="ion ion-md-arrow-forward ml-2" />
          </Button>
        </div>
        <p className="p-sm text-center mt-3">
          <Link href="/" prefetch={false}><a>Back Home Page</a></Link>
        </p>
      </form>
    </div>
  );
};

TypeSelection.propTypes = {
  onTypeChange: PropTypes.func
};

export default React.memo(TypeSelection);

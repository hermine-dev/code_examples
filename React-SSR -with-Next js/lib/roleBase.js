import React from 'react';
import {checkLoggedInUser} from 'utils';
import UserLayout from 'components/shared/Layouts/user';

export default (ComposedComponent,roleType) => {

  const RoleBase = (props) => {
      return (
        <ComposedComponent {...props} />
      );
  };

  RoleBase.Layout = ComposedComponent.Layout ? ComposedComponent.Layout : UserLayout;

  RoleBase.getInitialProps = async (ctx) =>{
    await checkLoggedInUser(ctx.req, ctx.res, roleType);

    let composedInitialProps = {};
    if (ComposedComponent.getInitialProps) {
      composedInitialProps = await ComposedComponent.getInitialProps(ctx);
    }

    return {
      ...composedInitialProps,
    };
  };
  return RoleBase;
};

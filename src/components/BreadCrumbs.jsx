import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const Breadcrumbs = ({ link }) => {
  const { pathname } = useLocation();
  return (
    <div className="flex gap-2 items-end">
      <Link to="/">
        <i className="fa-solid fa-home" />
        {link && pathname !== '/' && (
          <i className="fa-solid fa-chevron-right ml-2 scale-75 text-slate-600" />
        )}
      </Link>
      {link && (
        <Link to={`/${link?.path}`} className="text-slate-700 text-sm">{link?.title}</Link>
      )}
    </div>
  );
};

Breadcrumbs.propTypes = {
  link: PropTypes.objectOf(PropTypes.any),
};

Breadcrumbs.defaultProps = {
  link: {},
};

export default React.memo(Breadcrumbs);

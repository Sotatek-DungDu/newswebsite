import React from 'react';

const SidebarSubcride = () => {
  return (
    <div className="bg10 p-rl-35 p-t-28 p-b-35 m-b-50">
      <h5 className="f1-m-5 cl0 p-b-10">
        Subscribe
      </h5>

      <p className="f1-s-1 cl0 p-b-25">
        Get all latest content delivered to your email a few times a month.
      </p>

      <form className="size-a-9 pos-relative">
        <input className="s-full f1-m-6 cl6 plh9 p-l-20 p-r-55" type="text" name="email" placeholder="Email" />

        <button className="size-a-10 flex-c-c ab-t-r fs-16 cl9 hov-cl10 trans-03">
          <i className="fa fa-arrow-right"></i>
        </button>
      </form>
    </div>
  );
};

export default SidebarSubcride;
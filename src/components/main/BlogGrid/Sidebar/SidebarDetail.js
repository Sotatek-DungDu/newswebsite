import React from 'react';
import SidebarSubcride from './SidebarSubcride';
import SidebarMostPopular from './SidebarMostPopular';
import SidebarAvd from './SidebarAvd'
import SidebarTag from './SidebarTag'
const SidebarDetail = ({ data }) => {
  // console.log("data", data);

  return (
    <div class="col-md-10 col-lg-4 p-b-80" style={{ display: 'contents' }}>
      <div class="p-l-10 p-rl-0-sr991">
        <SidebarSubcride />
        <SidebarMostPopular />
        <SidebarAvd item={data} />
        <SidebarTag />
      </div>
    </div>
  );
};

export default SidebarDetail;

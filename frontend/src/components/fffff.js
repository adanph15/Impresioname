import React, { useState } from "react";
import UserAddressesPage from "../pages/user/UserAddressesPage";
import AddressForm from "./address/AddressForm";
import AddressRender from "./address/AddressRender";

function Tabs() {
  const [activeTab, setActiveTab] = useState("home");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="container mx-auto max-w-2xl bg-white rounded-lg shadow-md p-8">
      <ul className="flex border-b border-gray-300">
        <TabItem
          icon="home"
          label="Home"
          tabId="home"
          activeTab={activeTab}
          onClick={handleTabClick}
        />
        <TabItem
          icon="user-circle"
          label="Profile"
          tabId="profile"
          activeTab={activeTab}
          onClick={handleTabClick}
          dropdownItems={[
            { label: "Action", tabId: "action" },
            { label: "Link here", tabId: "link" },
            { label: "Do something", tabId: "do-something" },
          ]}
        />
        <TabItem
          icon="phone"
          label="Add Address"
          tabId="contact"
          activeTab={activeTab}
          onClick={handleTabClick}
        />
        <TabItem
          icon="cog"
          label="Settings"
          tabId="settings"
          activeTab={activeTab}
          onClick={handleTabClick}
        />
      </ul>
      <div className="contents mt-4">
        <TabContent tabId="home" activeTab={activeTab}>
          <h2>Home</h2>
          <AddressRender />
        </TabContent>
        <TabContent tabId="action" activeTab={activeTab}>
          <h2>Action</h2>
          <AddressForm />
        </TabContent>
        <TabContent tabId="contact" activeTab={activeTab}>
          <AddressForm />
        </TabContent>
        <TabContent tabId="do-something" activeTab={activeTab}>
          <h2>Do something</h2>
          <p>Add content for Do Something tab</p>
        </TabContent>
      </div>
    </div>
  );
}

function TabItem({ icon, label, tabId, activeTab, onClick, dropdownItems }) {
  const isActive = tabId === activeTab;
  return (
    <li
      className={`relative flex items-center cursor-pointer py-2 px-4 text-lg font-bold ${
        isActive ? "text-primary" : "text-gray-700"
      }`}
      onClick={() => onClick(tabId)}
    >
      <i className={`bx bx-${icon} mr-2`}></i>
      {label}
      {dropdownItems && (
        <ul
          className={`${
            isActive ? "block" : "hidden"
          } absolute right-0 top-full mt-2 bg-white shadow-md rounded-lg`}
        >
          {dropdownItems.map((item, index) => (
            <li
              key={index}
              className="py-2 px-4 cursor-pointer transition duration-300 hover:bg-gray-100"
              onClick={() => onClick(item.tabId)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function TabContent({ tabId, activeTab, children }) {
  return (
    <div
      className={`content ${tabId === activeTab ? "block" : "hidden"}`}
      id={tabId}
    >
      {children}
    </div>
  );
}

export default Tabs;
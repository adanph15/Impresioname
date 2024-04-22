import React, { useState } from "react";
import UserAddressesPage from "../pages/user/UserAddressesPage";
import AddressForm from "./address/AddressForm";
import AddressRender from "./address/AddressRender";
import ProfileInfo from "./profile/ProfileInfo";
import PurchaseRender from "./purchase/PurchaseRender";

const ProfileOptions = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <>
      <div className="container mx-auto max-w-4xl bg-white rounded-lg shadow-md p-8">
        <ul className="flex border-b border-gray-300">
          <TabItem
            label="Profile"
            tabId="profile"
            activeTab={activeTab}
            onClick={handleTabClick}
          />
          <TabItem
            label="View Addresses"
            tabId="viewAddresses"
            activeTab={activeTab}
            onClick={handleTabClick}
          />
          
          <TabItem
            label="Add Address"
            tabId="addAddress"
            activeTab={activeTab}
            onClick={handleTabClick}
          />
          <TabItem
            label="View Purchases"
            tabId="viewPurchases"
            activeTab={activeTab}
            onClick={handleTabClick}
          />
        </ul>
        <div className="p-4 ">
        <TabContent tabId="profile" activeTab={activeTab}>
          <ProfileInfo />
        </TabContent>
        <TabContent tabId="viewAddresses" activeTab={activeTab}>
          <AddressRender />
        </TabContent>
        <TabContent tabId="addAddress" activeTab={activeTab}>
          <AddressForm />
        </TabContent>
        <TabContent tabId="viewPurchases" activeTab={activeTab}>
          <PurchaseRender />
        </TabContent>
      </div>
      </div>

    </>
  );
}

function TabItem({ icon, label, tabId, activeTab, onClick, dropdownItems }) {
  const isActive = tabId === activeTab;
  return (
    <li
      className={`relative flex items-center cursor-pointer py-2 px-4 text-lg ${isActive ? "text-terciary font-bold " : "text-primary font-medium"
        }`}
      onClick={() => onClick(tabId)}
    >
      <i className={`bx bx-${icon} mr-2`}></i>
      {label}
      {dropdownItems && (
        <ul
          className={`${isActive ? "block" : "hidden"
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

export default ProfileOptions;
import * as React from "react";

function NotificationIcon(props) {
  return (
    <svg
      viewBox="0 0 91 91"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth="1.5"
      {...props}
    >
      <path d="M72.272 46.22v-8.507c0-12.41-8.248-22.928-19.55-26.364C51 10.826 49.91 10 45.5 10s-4.979.5-7.783 1.352c-11.302 3.436-20.542 13.95-20.542 26.36v8.508c0 10.9-4.155 21.237-11.7 29.105a2.666 2.666 0 001.924 4.51h24.263C32.9 85.914 38.286 90.5 44.724 90.5c6.437 0 11.823-4.587 13.061-10.664h24.263a2.666 2.666 0 001.924-4.511c-7.544-7.868-11.7-18.205-11.7-29.105zM44.724 85.168c-3.476 0-6.44-2.229-7.54-5.332h15.08c-1.102 3.103-4.065 5.332-7.54 5.332zM13.146 74.504c6.071-8.139 9.36-17.988 9.36-28.284v-8.507c0-12.25 9.967-22.217 22.218-22.217 12.25 0 22.216 9.966 22.216 22.217v8.507c0 10.296 3.29 20.145 9.362 28.284H13.145z" />
    </svg>
  );
}

export default NotificationIcon;
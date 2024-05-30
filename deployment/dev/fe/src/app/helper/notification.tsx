import { notification } from 'antd';

// Define the type for notification types
type NotificationType = 'success' | 'info' | 'warning' | 'error';

// Define the function to show notification with icon
export const myNotificationWithIcon = (type: NotificationType, message: string) => {
    notification[type]({
        message: message,
        style: {
            fontFamily: "Open Sans" // Optional custom font family
        },
    });
};

import home from "@/app/assets/common/icons/home.png";
import teacher from "@/app/assets/common/icons/teacher.png";
import student from "@/app/assets/common/icons/student.png";
import parent from "@/app/assets/common/icons/parent.png";
import subject from "@/app/assets/common/icons/subject.png";
import classed from "@/app/assets/common/icons/class.png";
import lesson from "@/app/assets/common/icons/lesson.png";
import exam from "@/app/assets/common/icons/exam.png";
import assignment from "@/app/assets/common/icons/assignment.png";
import result from "@/app/assets/common/icons/result.png";
import attendance from "@/app/assets/common/icons/attendance.png";
import calendar from "@/app/assets/common/icons/calendar.png";
import message from "@/app/assets/common/icons/message.png";
import profile from "@/app/assets/common/icons/profile.png";
import setting from "@/app/assets/common/icons/setting.png";
import logout from "@/app/assets/common/icons/logout.png";
import announcement from "@/app/assets/common/icons/announcement.png";
import { StaticImageData } from "next/image";

type MenuItem = {
    icon: string | StaticImageData; // Đường dẫn tới icon
    label: string; // Tên hiển thị của menu
    href: string; // Đường dẫn của menu
    visible: string[]; // Các vai trò (roles) được phép nhìn thấy menu
};

interface IMenuNavBar {
    title: string;
    items: MenuItem[];
}

// Phân quền user hiện tại đang là
export const roleUser = "admin";

export const menuItems: Array<IMenuNavBar> = [
    {
        title: "MENU",
        items: [
            {
                icon: home,
                label: "Thống kê",
                href: "/admin/home",
                visible: ["admin", "teacher", "student", "parent"],
            },
            {
                icon: student,
                label: "Nhân viên",
                href: "/admin/list/users",
                visible: ["admin", "teacher"],
            },
            {
                icon: student,
                label: "Sản phẩm",
                href: "/admin/product",
                visible: ["admin", "teacher"],
            },
            {
                icon: parent,
                label: "Parents",
                href: "/list/parents",
                visible: ["admin", "teacher"],
            },
            {
                icon: subject,
                label: "Subjects",
                href: "/list/subjects",
                visible: ["admin"],
            },
            {
                icon: classed,
                label: "Classes",
                href: "/list/classes",
                visible: ["admin", "teacher"],
            },
            {
                icon: lesson,
                label: "Lessons",
                href: "/list/lessons",
                visible: ["admin", "teacher"],
            },
            {
                icon: exam,
                label: "Exams",
                href: "/list/exams",
                visible: ["admin", "teacher", "student", "parent"],
            },
            // {
            //     icon: assignment,
            //     label: "Assignments",
            //     href: "/list/assignments",
            //     visible: ["admin", "teacher", "student", "parent"],
            // },
            // {
            //     icon: result,
            //     label: "Results",
            //     href: "/list/results",
            //     visible: ["admin", "teacher", "student", "parent"],
            // },
            // {
            //     icon: attendance,
            //     label: "Attendance",
            //     href: "/list/attendance",
            //     visible: ["admin", "teacher", "student", "parent"],
            // },
            // {
            //     icon: calendar,
            //     label: "Events",
            //     href: "/list/events",
            //     visible: ["admin", "teacher", "student", "parent"],
            // },
            // {
            //     icon: message,
            //     label: "Messages",
            //     href: "/list/messages",
            //     visible: ["admin", "teacher", "student", "parent"],
            // },
            // {
            //     icon: announcement,
            //     label: "Announcements",
            //     href: "/list/announcements",
            //     visible: ["admin", "teacher", "student", "parent"],
            // },
        ],
    },
    {
        title: "OTHER",
        items: [
            {
                icon: profile,
                label: "Profile",
                href: "/profile",
                visible: ["admin", "teacher", "student", "parent"],
            },
            {
                icon: setting,
                label: "Settings",
                href: "/settings",
                visible: ["admin", "teacher", "student", "parent"],
            },
            {
                icon: logout,
                label: "Logout",
                href: "/logout",
                visible: ["admin", "teacher", "student", "parent"],
            },
        ],
    },
];

const today = new Date(); // Lấy ngày hiện tại
const currentMonth = today.getMonth(); // Tháng hiện tại
const currentYear = today.getFullYear(); // Năm hiện tại
const currentDate = today.getDate(); // Ngày hiện tại

export const calendarEvents = [
    {
        title: "Math",
        allDay: false,
        start: new Date(currentYear, currentMonth, currentDate, 8, 0),
        end: new Date(currentYear, currentMonth, currentDate, 8, 45),
    },
    {
        title: "English",
        allDay: false,
        start: new Date(currentYear, currentMonth, currentDate, 9, 0),
        end: new Date(currentYear, currentMonth, currentDate, 9, 45),
    },
    {
        title: "Biology",
        allDay: false,
        start: new Date(currentYear, currentMonth, currentDate, 10, 0),
        end: new Date(currentYear, currentMonth, currentDate, 10, 45),
    },
    {
        title: "Physics",
        allDay: false,
        start: new Date(currentYear, currentMonth, currentDate, 11, 0),
        end: new Date(currentYear, currentMonth, currentDate, 11, 45),
    },
    {
        title: "Chemistry",
        allDay: false,
        start: new Date(currentYear, currentMonth, currentDate, 13, 0),
        end: new Date(currentYear, currentMonth, currentDate, 13, 45),
    },
    {
        title: "History",
        allDay: false,
        start: new Date(currentYear, currentMonth, currentDate, 14, 0),
        end: new Date(currentYear, currentMonth, currentDate, 14, 45),
    },
];


export const userData = [
    {
        id: 1,
        userId: "1234567899",
        name: "John Doe",
        email: "huynhthanhnhan732004@gmail.com",
        photo: "https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/441901853_1262823381359147_4724735125941656324_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=9i5awffN3B8Q7kNvgEKrm15&_nc_oc=AdjDZLwuQxvaJn3QberSvUFlML6ibVG94K87RDbnJUrVFsR63G7dbW6L1a00TghJx4DsBk0OIik-d9l2Xj-fa0Et&_nc_zt=23&_nc_ht=scontent.fsgn8-4.fna&_nc_gid=AUAXmvWDTMxUXyj35T18xlP&oh=00_AYBIjLrwdxt_WE0XYPhGRZSQ10JxYIKjK6vuP3qZLx3Alg&oe=6786AB98",
        phone: "123321123",
        subject: ["content", "dev"],
        classes: ["1B", "2C", "3C"],
        address: "123 HO CHI MINH VIET NAM"
    },

]

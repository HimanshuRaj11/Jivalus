import RightSideBar from "../../../../components/RightSideBar";
import Footer from "./footer";

export default function Layout({ children }) {
    return (
        <>
            <div className="w-full bg-lightbg top-16 dark:bg-darkbg min-h-screen flex left-2 pl-8 " >
                {children}
                <RightSideBar />
            </div>
            {/* <Footer /> */}
        </>
    )
}
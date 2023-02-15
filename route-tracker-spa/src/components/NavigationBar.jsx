import {useMsal} from "@azure/msal-react";
import {Button, Dropdown, Navbar} from "react-daisyui";
import ThemeSwitch from "./ThemeSwitch.jsx";


export const NavigationBar = () => {
    const {instance} = useMsal();
    const account = instance.getActiveAccount();
    const firstLetterOfCurrentUser = account.name[0];

    const handleLogoutPopup = () => {
        instance.logoutPopup({
            mainWindowRedirectUri: '/', // redirects the top level app after logout
        }).then();
    };

    return (
        <div className="pb-40 flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
            <Navbar className={"shadow-xl rounded-box bg-base-100"}>
                <Navbar.Start>
                    <Dropdown>
                        <Button color="ghost" shape="circle" tabIndex={0}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h7"
                                />
                            </svg>
                        </Button>
                        <Dropdown.Menu tabIndex={0} className="menu-compact w-52">
                            <Dropdown.Item>Homepage</Dropdown.Item>
                            <Dropdown.Item>Portfolio</Dropdown.Item>
                            <Dropdown.Item>About</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Navbar.Start>
                <Navbar.Center>
                    <Button color="ghost" className="normal-case text-xl">
                        Route Tracker
                    </Button>
                </Navbar.Center>
                <Navbar.End className="navbar-end">
                    <ThemeSwitch/>
                    <Dropdown vertical="end">
                        <Button color="ghost" className="avatar placeholder" shape="circle">
                            {firstLetterOfCurrentUser}
                        </Button>
                        <Dropdown.Menu className="w-52 menu-compact">
                            <Dropdown.Item onClick={handleLogoutPopup}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Navbar.End>
            </Navbar>
        </div>
    )
}
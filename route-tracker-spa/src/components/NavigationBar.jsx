import {useMsal} from "@azure/msal-react";
import {Button, Divider, Dropdown, Navbar} from "react-daisyui";
import ThemeSwitch from "./ThemeSwitch.jsx";
import LanguageSwitch from "./LanguageSwitch.jsx";
import {BiMenuAltLeft} from "react-icons/bi";
import {useTranslation} from "react-i18next";


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
        <div className="pb-10 flex w-full component-preview items-center justify-center gap-2 font-sans">
            <Navbar className={"shadow-xl rounded-box bg-base-100"}>
                <Navbar.Start>
                    <Dropdown>
                        <Button color="ghost" shape="circle" tabIndex={0}>
                            <BiMenuAltLeft/>
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
                    <LanguageSwitch/>
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
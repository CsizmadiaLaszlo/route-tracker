import {useTranslation} from "react-i18next";
import {HiLanguage} from "react-icons/hi2";
import {Button, Dropdown} from "react-daisyui";
import {languages} from "../i18n.js";

const LanguageSwitch = () => {
    const {i18n} = useTranslation();

    const handleLanguageChange = (language) => {
        i18n.changeLanguage(language).then()
    }

    return (
        <Dropdown>
            <Button color="ghost" shape="circle" tabIndex={0}>
                <HiLanguage/>
            </Button>
            <Dropdown.Menu tabIndex={0} className="menu-compact">
                <>
                    {Object.keys(languages).map((language) => (
                        <Dropdown.Item key={language}
                                       className={"ml-2"}
                                       style={{fontWeight: i18n.resolvedLanguage === language ? 'bold' : 'normal'}}
                                       type="submit"
                                       onClick={() => handleLanguageChange(language)}>
                            {languages[language].nativeName}
                        </Dropdown.Item>
                    ))}
                </>
            </Dropdown.Menu>
        </Dropdown>
    )
}
export default LanguageSwitch;
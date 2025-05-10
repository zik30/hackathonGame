import style from "./registrationModal.module.scss";
import { useForm } from "react-hook-form";
import closeIcon from "../../assets/icons/x.svg";
import {useEffect} from "react";
import {nanoid} from "nanoid";


const RegistrationModal = ({ modal,onClose}) => {

    const regExpName = /([а-яА-ЯёЁ]|[a-zA-Z]){2}/;
    useEffect(() => {
        document.body.style.overflow = modal  ? "hidden" : "scroll";
        return () => {
            document.body.style.overflow = "";
        };
    }, [modal]);


    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm({ mode: "all" });
    const sendToBitrix = async (name, phone) => {
        const url = "https://geektech.bitrix24.ru/rest/1/e08w1jvst0jj152c/crm.lead.add.json";
        const data = {
            fields: {
                SOURCE_ID: 127,
                NAME: name,
                TITLE: "GEEKS GAME: Хакатон 2025",
                PHONE: [{ VALUE: phone, VALUE_TYPE: "WORK" }]
            }
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            console.log("Bitrix24 Ответ:", result);
        } catch (error) {
            console.error("Ошибка при отправке в Bitrix24:", error);
        }
    };
    const checkUserExists = async (phone) => {
        try {
            const response = await fetch(`https://66a8b255e40d3aa6ff5902eb.mockapi.io/players?phone=${phone}`);
            const result = await response.json();
            return result.length > 0; // Если массив не пуст, значит пользователь есть
        } catch (error) {
            console.error("Ошибка при проверке регистрации:", error);
            return false;
        }
    };
    const sendToMockApi = async (name,phone) => {
        const userExists = await checkUserExists(phone);

        if (userExists) {
            alert("Вы уже зарегистрированы!");
            return;
        }
        const url = "https://66a8b255e40d3aa6ff5902eb.mockapi.io/players";
        const data = {
            name: name,
            id: nanoid(),
            points: 0,
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            console.log("Bitrix24 Ответ:", result);
        } catch (error) {
            console.error("Ошибка при отправке в Bitrix24:", error);
        }
    };

    const onSubmit = (data) => {
        const formattedPhone = formatPhoneNumber(data.phone);
        sendToBitrix(data.name, formattedPhone);
        sendToMockApi(data.name,formattedPhone)
        reset();
        document.body.style.overflow = "scroll";
    };

    const checkName = value => {
        return regExpName.test(value);
    };

    const handlePhoneChange = e => {
        let phoneValue = e.target.value.replace(/[^\d]/g, "");
        phoneValue = phoneValue.slice(3);
        const fullPhoneValue = "+996" + phoneValue;
        if (fullPhoneValue.length > 13) {
            setValue("phone", fullPhoneValue.slice(0, 13));
        } else {
            setValue("phone", fullPhoneValue);
        }
    };
    const validatePhoneNumber = value => {
        const regExpNumber = /^\+996[23579]\d{8}$/;
        const cleanedNumber = value.replace(/[^\d+]/g, "");
        const isValid = regExpNumber.test(cleanedNumber);
        return isValid;
    };

    const formatPhoneNumber = value => {
        let cleanedNumber = value.replace(/[^\d+]/g, "").replace(/(?!^\+)\+/g, "");
        if (cleanedNumber.startsWith("0")) {
            cleanedNumber = "+996" + cleanedNumber.slice(1);
        }
        return cleanedNumber;
    };



    return modal ? (
        <div className={style.modalOverlay}>
            <div className={style.modal}>
                <button className={style.closeButton} onClick={onClose}>
                    <img src={closeIcon} alt='' />
                </button>
                    <form className={style.container} onSubmit={handleSubmit(onSubmit)}>
                        <p className={style.message}>Пройдите регистрацию</p>
                        <div className={style.inputAreaItself}>
                            <div className={style.wrapper}>
                                <div className={style.inputArea}>
                                    <input
                                        name='name'
                                        placeholder='Ваше ФИО'
                                        className={`${style.input} ${errors.name ? style.errorInput : ""}`}
                                        maxLength={50}
                                        {...register("name", {
                                            required: true,
                                            validate: checkName
                                        })}
                                    />
                                    {errors.name && (
                                        <p
                                            className={style.errorMessage}
                                        >
                                            * Это поле обязательно для заполнения
                                        </p>
                                    )}
                                </div>
                                <div className={style.mainInputArea}>
                                    <input
                                        name='phone'
                                        className={`${style.input} ${errors.phone ? style.errorInput : ""}`}
                                        defaultValue='+996'
                                        {...register("phone", {
                                            required: true,
                                            validate: validatePhoneNumber
                                        })}
                                        onInput={handlePhoneChange}
                                    />
                                    {errors.phone && (
                                        <p className={style.errorMessage}
                                        >
                                            * Это поле обязательно для заполнения
                                        </p>
                                    )}
                                </div>

                            </div>
                            <button className={style.button} type='submit'>SEND</button>
                        </div>
                    </form>
            </div>
        </div>) : null
    ;
};
export default RegistrationModal;

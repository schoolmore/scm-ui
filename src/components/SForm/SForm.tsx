import * as React from "react";
import { useCallback, useRef } from "react";
import { SFormContext } from "../../context/SForm/SFormContext.js";


export interface ISForm {
    /** Contenu du formulaire */
    children    : React.ReactNode,
    /** Méthode exécutée à la soumission, uniquement si tous les champs sont valides */
    onSubmit    : (data : Record<string, FormDataEntryValue>) => void,
    /** Identifiant du formulaire, pour soumettre depuis un autre bouton */
    id?         : string,
}

const SForm = ( {
    children,onSubmit,id,
}: ISForm ) => {

    const fields = useRef(new Map<string, () => string | undefined>());

    const register = useCallback((id : string, validate : () => string | undefined) => {
        fields.current.set(id, validate);
    }, []);

    const unregister = useCallback((id : string) => {
        fields.current.delete(id);
    }, []);

    const handleSubmit = (e : React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const errors = [...fields.current.values()].map(validate => validate());
        if (errors.some(Boolean)) return;

        onSubmit(Object.fromEntries(new FormData(e.currentTarget)));
    };

    return (
        <SFormContext.Provider value={{register,unregister}}>
            <form id={id} noValidate onSubmit={handleSubmit}>
                {children}
            </form>
        </SFormContext.Provider>
    );

}

export default SForm;
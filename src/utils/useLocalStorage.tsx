import { Dispatch, SetStateAction, useState } from "react";

const MasterKey = 'save_the_recruits' as const;
interface IMasterStorage {
    [key: string]: string;
}
const storage: IMasterStorage = JSON.parse((process.browser && window.localStorage[MasterKey] || '{}')) as IMasterStorage;

export function useLocalStorage(initial: string, key: string): [string, Dispatch<SetStateAction<string>>] {
    if (process.browser) {
        window.localStorage[MasterKey] = JSON.stringify(storage);
        if (storage[key]) {
            initial = storage[key];
        } else {
            storage[key] = initial;
        }
    }
    const [value, setValue] = useState<string>(initial);
    
    const setV: Dispatch<SetStateAction<string>> = (v: SetStateAction<string>): void => {
        const newV = v instanceof Function ? v(value) : v;
        storage[key] = newV;
        window.localStorage[MasterKey] = JSON.stringify(storage);
        setValue(newV);
    };

    return [value, setV];
}
import { useMemo, useState } from 'react';

export const useBoolean = (defaultValue?: boolean) => {
  const [value, setValue] = useState(defaultValue);

  return useMemo(() => {
    return [value, () => setValue(true), () => setValue(false), () => setValue(!value)];
  }, [value, setValue]);
};
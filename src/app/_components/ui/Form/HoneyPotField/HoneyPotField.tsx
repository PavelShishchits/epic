import { DEFAULT_INPUT_NAME } from '@/lib/honeypot.server';

interface HoneypotFieldProps {
  name?: string;
}

const HoneypotField = ({ name }: HoneypotFieldProps) => {
  return (
    <div className="hidden" aria-hidden="true">
      <input
        name={DEFAULT_INPUT_NAME ?? name}
        autoComplete="off"
        tabIndex={-1}
      />
    </div>
  );
};

export { HoneypotField };

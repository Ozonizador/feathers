import React from "react";

interface FeathersButtonProps {
  text: string;
  onClick: (e) => void;
  loading: boolean;
}

const FeathersButton = ({ text, onClick, loading }: FeathersButtonProps) => {
  return (
    <>
      <button className="rounded-xl bg-primary-500 p-4 text-center text-white" onClick={onClick} disabled={loading}>
        {loading ? <svg className="... mr-3 h-5 w-5 animate-spin" viewBox="0 0 24 24"></svg> : text}
      </button>
    </>
  );
};

export default FeathersButton;

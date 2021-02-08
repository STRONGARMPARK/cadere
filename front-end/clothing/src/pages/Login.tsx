import React from 'react'

interface LoginProps {

}

export const Login: React.FC<LoginProps> = () => {
  return (
    <div>
      <input placeholder="Username" type="text" />
      <input placeholder="Password" type="text" />
    </div>
  );
}
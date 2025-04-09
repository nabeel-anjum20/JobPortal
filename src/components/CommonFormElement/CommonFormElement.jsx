"use client"

import React from 'react'
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

function CommonFormElement({
    action,
    buttonText,
    formData,
    setFormData,
    formControls,
    handleFileChange,
    isButtonDisabled,
}) {
  return (
    <>
      <form action={action}>
        {formControls.map((item, index) => (
          <div key={index}>
            {item.componentType === "input" ? (
              <Input
                className="w-full rounded-md h-[60px] bg-gray-100 mt-3 text-lg outline-none drop-shadow-sm transition-all duration-300 ease-in-out focus:bg-white focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0"
                type={item.componentType}
                placeholder={item.placeholder}
                value={formData?.[item.name] || ""}
                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                name={item.name}
                id={item.name}
                disabled={item.disabled}
              />
            ) : item.componentType === "file" ? (
              <Label
                htmlFor={item.name}
                className="flex items-center bg-gray-100 py-3 px-3 mx-auto text-center rounded-md border-2 cursor-pointer"
              >
                <h2>{item.label}</h2>
                <Input
                  id={item.name}
                  name={item.name}
                  type="file"
                  onChange={handleFileChange}
                />
              </Label>
            ) : null}
          </div>
        ))}

        <Button
          className="disabled:opacity-50 flex h-11 items-center px-5 mt-3 cursor-pointer"
          type="submit"
          disabled={isButtonDisabled}
        >
          {buttonText}
        </Button>
      </form>
    </>
  );
}

export default CommonFormElement;

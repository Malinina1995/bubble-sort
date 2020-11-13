import React from "react";

export const Info: React.FC = () => {
   return (
      <div className='mb-30'>
         <div className='generate'>
            Для генерации случайных чисел нажмите - "Generate"
         </div>
         <div className='sort'>
            Для сортировки сгенерированных чисел нажмите - "Sort"
         </div>
      </div>
   )
}

export type DayType = {
   time: string,
   description: string
}

export type ScheduleType = {
   date: string,
   events: DayType[],
}

export const ScheduleList: ScheduleType[] = [

   {
       date: "NOW... let's do some maths",
       events: [
           {
               time: "XOR Marathon",
               description: "Single-byte XOR with a twist. Are you able to find the right key? " 
           },
           {
               time: "decrypt me",
               description: "1c0e475b4a5d5b4e175b4a0b170e0a5b4c5d4e175b175d4b0a0b475b0e5d"
           }
       ]
   }
]
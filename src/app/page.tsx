/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { ModeToggle } from '@/components/theme-toggle '
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Camera, FlipHorizontal, PersonStandingIcon, Video, Volume2 } from 'lucide-react'
import React, { useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { toast } from "sonner"
import BounceLoader from "react-spinners/BounceLoader";
import { Popover, PopoverContent } from '@/components/ui/popover'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { Slider } from '@/components/ui/slider'
import { beep } from '../../utils/audio'

type Props = object

const HomePage = (props: Props) => {
  const webcamRef = useRef<Webcam>(null);

  //state 
  const [mirrored, setMirrored] = useState<boolean>(false);
  const [isRecording, SetisRecording] = useState<boolean>(false);
  const [autoRecordEnabled, setautoRecordEnabled] = useState<boolean>(false);
  const [volume, setVolume] = useState(0.5);
  return (


    <div className="flex h-screen">
      {/* left side */}
      <div className="relative">
        <div className="relative h-screen w-full">
          <Webcam ref={webcamRef}
            mirrored={mirrored}
            className='h-full w-full object-contain p-2'
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex flex-row flex-1">
        <div className="border-primary/5 border-2 max-w-xs flex flex-col gap-2 justify-between  shadow-md rounded-md p-4">
          {/* top section */}
          <div className="flex flex-col gap-2">
            <ModeToggle />

            <Button
              variant={'outline'}
              size={'icon'}
              onClick={() => {
                setMirrored((prev) => !prev)
              }}
            >
              <FlipHorizontal />
            </Button>

            <Separator className='my-2' />
          </div>

          {/* Middle section  */}
          <div className="flex flex-col gap-2">
            <Separator className='my-2' />

            <Button
              variant={'outline'}
              size={'icon'}
              onClick={userPromptScreenshot}
            >
              <Camera />
            </Button>

            <Button
              variant={isRecording ? 'destructive' : 'outline'}
              size={'icon'}
              onClick={userPromptRecord}
            >
              <Video />
            </Button>

            <Separator className='my-2' />
            <Button
              variant={autoRecordEnabled ? 'destructive' : 'outline'}
              size={'icon'}
              onClick={toggleAutoRecord}
            >
              {autoRecordEnabled ? <BounceLoader color="#ffffff" size={25} /> : <PersonStandingIcon />}
            </Button>
          </div>


          {/* Bottom section  */}
          <div className="flex flex-col gap-2">
            <Separator className='my-2' />

            <Popover>
              <PopoverTrigger asChild>
                <Button variant={'outline'} size={'icon'}>
                  <Volume2 />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Slider max={1} min={0} step={0.1} defaultValue={[volume]}
                  onValueCommit={(val) => {
                    setVolume(val[0]);
                    beep(val[0]);
                  }}
                />
              </PopoverContent>
            </Popover>

          </div>
        </div>

      </div>
    </div >
  )

  //handler function
  function userPromptScreenshot() {

    //take screenshot 

    //save it to download
  }

  function userPromptRecord() {

    //check if isRecording
    //then stop isRecording
    // and save to download


  }

  function toggleAutoRecord() {
    if (autoRecordEnabled) {
      setautoRecordEnabled(false);

      //show toast to user to notify the change
      toast("Auto record disable")


    }
    else {
      setautoRecordEnabled(true);
      //show toast
      toast("Auto record enabled")
    }
  }
}

export default HomePage
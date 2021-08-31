import React, { useCallback, useState } from "react";
import Cropper from 'react-easy-crop'
import { Box, Button, Image } from "@chakra-ui/react";
import { Area } from "react-easy-crop/types";
import getCroppedImg from "../utils/imageUtils";

const dogImg =
  'https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000'

const CropperEasyPage: React.FC = () => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [croppedImage, setCroppedImage] = useState<string | null>(null)

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = useCallback(async () => {
    if (!croppedAreaPixels) return;

    try {
      const croppedImage = await getCroppedImg(
        dogImg,
        croppedAreaPixels,
      )
      console.log('donee', { croppedImage })
      setCroppedImage(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels])

  return (
    <Box height={150}>
      <Box>
        <Cropper
          image={dogImg}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
        <Button onClick={showCroppedImage}>showCropped</Button>
      </Box >
      <Box marginTop={300}>
        {croppedImage && <Image src={croppedImage} height="300px" />}
      </Box>
    </Box>
  );
};

export default CropperEasyPage;

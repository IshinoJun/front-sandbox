/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Box, Button, Heading, HStack } from "@chakra-ui/react";

const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

const CropperPage: React.FC = () => {
  const [image, setImage] = useState<string>(defaultSrc);
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState<Cropper>();
  const onChange = (e: React.ChangeEvent<HTMLInputElement> & { dataTransfer?: DataTransfer }) => {
    e.preventDefault();
    let files;

    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    if (!files) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result?.toString() ?? "");
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  return (
    <Box>
      <Box width={`100%`}>
        <input type="file" onChange={onChange} />
        <Button>Use default img</Button>
        <Box marginTop={10}>
          <Cropper
            style={{ height: 400, width: "100%" }}
            zoomTo={0.5}
            initialAspectRatio={1}
            preview=".img-preview"
            src={image}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
            onInitialized={(instance) => {
              setCropper(instance);
            }}
            guides={true}
          />
        </Box>
      </Box>
      <HStack>
        <Box
          width="50%"
          height="300px"
        >
          <Heading as="h2">
            <span>Crop</span>
            <Button onClick={getCropData}>
              Crop Image
            </Button>
          </Heading>
          <img style={{ width: "100%" }} src={cropData} alt="cropped" />
        </Box>
        <Box className="box" width="50%">
          <Heading as="h2">Preview</Heading>
          <Box
            overflow="hidden"
            width="100%"
            height="300px"
            className="img-preview"
          />
        </Box>
      </HStack>
      <br style={{ clear: "both" }} />
    </Box >
  );
};

export default CropperPage;

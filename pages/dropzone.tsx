/* eslint-disable @next/next/no-img-element */
import { Box, HStack } from '@chakra-ui/react'
import { NextPage } from 'next'
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'

const Dropzone: NextPage = () => {
  const [files, setFiles] = useState<({ preview: string } & File)[]>([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*', onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => ({ ...file, preview: URL.createObjectURL(file) })))
    },
  });

  const thumbs = files.map((file, index) => (
    <div key={index}>
      <div >
        <img src={file.preview} />
      </div>
    </div>
  ));

  return (
    <Box>
      <HStack {...getRootProps({ className: 'dropzone' })} width={200} height={200} backgroundColor="Highlight" justifyContent="center" margin="0 auto">
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>drop some files here, or click to select files</p>
        }
      </HStack>
      <aside>
        {thumbs}
      </aside>
    </Box>
  )
}

export default Dropzone;
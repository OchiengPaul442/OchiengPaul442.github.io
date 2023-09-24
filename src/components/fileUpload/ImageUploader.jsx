import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { v4 as uuidv4 } from 'uuid'

const ImageUploader = ({
    maxFileSize = 3145728,
    acceptedFileTypes = ['image/jpeg', 'image/png'],
    onUpload,
}) => {
    const [files, setFiles] = useState([])
    const [uploadError, setUploadError] = useState(null)

    const validateFiles = (acceptedFiles) => {
        const tooLargeFiles = acceptedFiles.filter(
            (file) => file.size > maxFileSize
        )
        if (tooLargeFiles.length) {
            return `File size should not exceed ${maxFileSize / 1024 / 1024} MB`
        }

        const invalidTypeFiles = acceptedFiles.filter(
            (file) => !acceptedFileTypes.includes(file.type)
        )
        if (invalidTypeFiles.length) {
            return 'Invalid file type'
        }

        return null
    }

    const onDrop = useCallback(
        (acceptedFiles) => {
            const error = validateFiles(acceptedFiles)
            setUploadError(error)

            if (error) {
                return
            }

            setFiles((prevFiles) => {
                const newFiles = acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                        id: uuidv4(),
                    })
                )

                const updatedFiles = [...prevFiles, ...newFiles]

                if (onUpload) {
                    onUpload(updatedFiles)
                }

                return updatedFiles
            })
        },
        [maxFileSize, onUpload, acceptedFileTypes]
    )

    const removeFile = useCallback(
        (id) => {
            setFiles((prevFiles) => {
                const updatedFiles = prevFiles.filter((file) => file.id !== id)
                if (onUpload) {
                    onUpload(updatedFiles)
                }
                return updatedFiles
            })
        },
        [onUpload]
    )

    const { getRootProps, getInputProps } = useDropzone({
        accept: acceptedFileTypes.join(', '),
        onDrop,
        onDropRejected: () => setUploadError('Some files were rejected'),
    })

    const images = files.map((file) => (
        <div
            key={file.id}
            className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 relative"
        >
            <IconButton
                aria-label="delete"
                className="absolute top-0 right-0"
                sx={{ color: 'red' }}
                onClick={() => removeFile(file.id)}
            >
                <CloseIcon />
            </IconButton>
            <div>
                <img
                    src={file.preview}
                    style={{ width: '200px' }}
                    alt="preview"
                />
            </div>
            <p>
                {file.path} - {file.size} bytes
            </p>
        </div>
    ))

    return (
        <section className="container mx-auto p-6 font-mono">
            <div
                {...getRootProps({
                    className:
                        'dropzone w-full py-32 flex flex-col items-center bg-gray-200 border-dashed px-24 border-4 border-gray-300',
                })}
            >
                <input {...getInputProps()} />

                <aside>
                    {images.length > 0 ? (
                        <ul className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {images}
                        </ul>
                    ) : (
                        <>
                            <p className="lowercase text-sm text-gray-400 group-hover:text-purple-600 pt-1 tracking-wider">
                                Drag & drop some files here, or click to select
                                files
                            </p>
                            <p
                                className=" text-xs
                        text-green-400
                        italic
                        mt-2
                        mb-2
                        text-center w-full"
                            >
                                Max file size: {maxFileSize / 1024 / 1024} MB
                                accepted:{acceptedFileTypes.join(', ')}
                            </p>
                        </>
                    )}
                    {uploadError && (
                        <p
                            className="
                    text-red-500
                    text-xs
                    italic
                    mt-2
                    mb-2
                    text-center
                    "
                        >
                            Error: {uploadError}
                        </p>
                    )}
                </aside>
            </div>
        </section>
    )
}

export default ImageUploader

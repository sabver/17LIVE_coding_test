import styled from "styled-components";

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  border-radius: 100%;
`;

const Image = styled.img`
  object-fit: cover;

  width: 100%;
  height: 100%;
`;

const ImageComponent = ({
  src,
  height,
  width,
}: {
  src: string;
  height: number;
  width: number;
}) => {
  return (
    <ImageContainer
      style={{
        height: `${height}px`,
        width: `${width}px`,
        minHeight: `${height}px`,
        minWidth: `${width}px`,        
      }}
    >
      <Image src={src}></Image>
    </ImageContainer>
  );
};

export default ImageComponent;

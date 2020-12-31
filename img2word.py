import cv2
import sys
import numpy as np

img = cv2.imread( sys.argv[1], 0 )
pad_width = (512 - img.shape[1])//2
# img = np.pad(img[:,], ((0,0), (pad_width,pad_width), (0,0)), 'constant') 
img = np.pad(img[:,], ((0,0), (pad_width,pad_width)), 'constant') 
ret,thresh1 = cv2.threshold(img,127,255,cv2.THRESH_BINARY)
img = thresh1
# print(img[:, ])
print(img.shape) # 256, 400, 3
print(img[0].shape) # 400, 3
# print(img[0])

for y in range(img.shape[0]):
    for x_pos in range(32):
        v = []
        for jj in range(16):
            x = x_pos * 16 + jj
            f = ""
            if img[y,x] == 255:
                f = "I"
            else:
                f = "O"
            v.append(f)
        # print(v.join(""))
        print("".join(v))

# cv2.imshow('image',img)
# cv2.waitKey(0)
# cv2.destroyAllWindows()

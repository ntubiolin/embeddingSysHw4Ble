#the following macros should be defined.
TARGET1=i2c-pi-arduino
TARGET2=ADXL
OBJECT1=i2c-pi-arduino.o
OBJECT2=ADXL.o
CC=gcc
CXX=g++
LD=g++
LD_FLAGS =
LD_FLAGS += -lwiringPi
#LD_FLAGS += -lncurses -pthread
C_FLAGS= -g -O0
#C_FLAGS=

# end of user configuration #
all: $(TARGET1) $(TARGET2)
$(TARGET1) : $(OBJECT1)
	$(LD) $^ $(LD_FLAGS) -o $@
$(TARGET2) : $(OBJECT2)
	$(CC) $^ $(LD_FLAGS) -o $@

%.o : %.c
	$(CC) $(C_FLAGS) -c $<
%.o : %.cpp
	$(CXX) $(C_FLAGS) -c $<
.PHONY: clean
clean :
	-rm -f $(OBJECT1) $(OBJECT2) $(TARGET1) $(TARGET2)

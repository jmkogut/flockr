SRV=http-server
PORT=8080

all: node

node:
	./server.js

vanilla:
	$(SRV) -p $(PORT)

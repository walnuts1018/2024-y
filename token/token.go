package token

import (
	"crypto/rand"
	"fmt"
)

const UpperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const LowerLetters = "abcdefghijklmnopqrstuvwxyz"
const Numbers = "0123456789"
const Alphabets = UpperLetters + LowerLetters
const Alphanumeric = Alphabets + Numbers

func Generate(base string, n ...int) (string, error) {
	var length int
	if len(n) == 0 {
		length = 32
	} else {
		length = n[0]
	}

	b := make([]byte, length)
	if _, err := rand.Read(b); err != nil {
		return "", fmt.Errorf("failed to read random: %w", err)
	}

	var result string
	for _, v := range b {
		result += string(base[int(v)%len(base)])
	}
	return result, nil

}

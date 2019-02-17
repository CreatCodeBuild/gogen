function generateCode(package, type) {
    return `
type ${type}Set map[${package}${type}]struct{}

func New${type}Set(elements ...${package}${type}) ${package}${type}Set {
    set := ${package}${type}Set{}
    set.Add(elements...)
    return set
}

func (set ${type}Set) Contains(element ${package}${type}) bool {
    _, ok := set[element]
    return ok
}

func (set ${type}Set) Add(elements ...${package}${type}) {
    for _, element := range elements {
        set[element] = struct{}{}
    }
}

func (set ${type}Set) Remove(elements ...${package}${type}) {
    for _, element := range elements {
        delete(set, element)
    }
}

func (set ${type}Set) Union(set2 ${type}Set) ${type}Set {
    set3 := make(${type}Set)
    set3.Add(set.Slice()...)
    set3.Add(set2.Slice()...)
    return set3
}

// Or returns a set set3 such that for each element in set3, this element is in either set or set2.
func (set ${type}Set) Or(set2 ${type}Set) ${type}Set {
    return set.Union(set2)
}

func (set ${type}Set) Intersection(set2 ${type}Set) ${type}Set {
    set3 := make(${type}Set)
    for element := range set2 {
        if set.Contains(element) {
            set3.Add(element)
        }
    }
    return set3
}

// And returns a set set3 such that for each element in set3, this element is in both set and set2.
func (set ${type}Set) And(set2 ${type}Set) ${type}Set {
    return set.Intersection(set2)
}

func (set ${type}Set) Slice() []${package}${type} {
    set2 := make([]${package}${type}, len(set))
    i := 0
    for element := range set {
        set2[i] = element
        i++
    }
    return set2
}`
}
